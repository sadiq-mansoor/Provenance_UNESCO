"""
Real AI Detection Service
Integrates multiple AI detection models and services
"""

import requests
import torch
import numpy as np
from PIL import Image
import cv2
from transformers import pipeline
import os
from typing import Dict, Any, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIDetectionService:
    def __init__(self):
        self.models_loaded = False
        self.ai_classifier = None
        self.deepfake_detector = None
        
    def load_models(self):
        """Load AI detection models"""
        try:
            # Load Hugging Face AI image detector
            self.ai_classifier = pipeline(
                "image-classification",
                model="umm-maybe/AI-image-detector",
                device=0 if torch.cuda.is_available() else -1
            )
            
            logger.info("AI detection models loaded successfully")
            self.models_loaded = True
            
        except Exception as e:
            logger.warning(f"Could not load AI models: {e}")
            logger.info("Falling back to heuristic detection")
            self.models_loaded = False
    
    def detect_ai_content(self, image_path: str) -> Dict[str, Any]:
        """Detect if image is AI-generated using multiple methods"""
        
        if not self.models_loaded:
            self.load_models()
        
        results = {
            "is_ai_generated": False,
            "confidence": 0.0,
            "detection_methods": [],
            "technical_indicators": {}
        }
        
        try:
            # Method 1: Hugging Face AI detector
            if self.ai_classifier:
                hf_result = self._detect_with_huggingface(image_path)
                results["detection_methods"].append(hf_result)
            
            # Method 2: Technical analysis
            tech_result = self._technical_analysis(image_path)
            results["detection_methods"].append(tech_result)
            results["technical_indicators"] = tech_result["indicators"]
            
            # Method 3: Metadata analysis
            metadata_result = self._analyze_metadata(image_path)
            results["detection_methods"].append(metadata_result)
            
            # Combine results
            results = self._combine_detection_results(results)
            
        except Exception as e:
            logger.error(f"Error in AI detection: {e}")
            results["error"] = str(e)
        
        return results
    
    def _detect_with_huggingface(self, image_path: str) -> Dict[str, Any]:
        """Use Hugging Face model for AI detection"""
        try:
            image = Image.open(image_path)
            result = self.ai_classifier(image)
            
            # Find AI-related predictions
            ai_score = 0.0
            for pred in result:
                if 'artificial' in pred['label'].lower() or 'ai' in pred['label'].lower():
                    ai_score = max(ai_score, pred['score'])
            
            return {
                "method": "huggingface_ai_detector",
                "is_ai": ai_score > 0.5,
                "confidence": ai_score,
                "raw_results": result
            }
            
        except Exception as e:
            logger.error(f"Hugging Face detection failed: {e}")
            return {
                "method": "huggingface_ai_detector",
                "is_ai": False,
                "confidence": 0.0,
                "error": str(e)
            }
    
    def _technical_analysis(self, image_path: str) -> Dict[str, Any]:
        """Analyze technical indicators of AI generation"""
        try:
            image = cv2.imread(image_path)
            
            indicators = {}
            
            # Check for common AI artifacts
            indicators["noise_patterns"] = self._analyze_noise_patterns(image)
            indicators["compression_artifacts"] = self._check_compression_artifacts(image)
            indicators["pixel_consistency"] = self._check_pixel_consistency(image)
            indicators["frequency_analysis"] = self._frequency_domain_analysis(image)
            
            # Calculate overall AI likelihood based on technical indicators
            ai_indicators = sum([
                indicators["noise_patterns"]["suspicious"],
                indicators["compression_artifacts"]["suspicious"],
                indicators["pixel_consistency"]["suspicious"],
                indicators["frequency_analysis"]["suspicious"]
            ])
            
            confidence = min(ai_indicators / 4.0, 1.0)
            
            return {
                "method": "technical_analysis",
                "is_ai": confidence > 0.6,
                "confidence": confidence,
                "indicators": indicators
            }
            
        except Exception as e:
            logger.error(f"Technical analysis failed: {e}")
            return {
                "method": "technical_analysis",
                "is_ai": False,
                "confidence": 0.0,
                "error": str(e)
            }
    
    def _analyze_noise_patterns(self, image) -> Dict[str, Any]:
        """Analyze noise patterns that may indicate AI generation"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Calculate noise characteristics
        noise = cv2.Laplacian(gray, cv2.CV_64F).var()
        
        # AI-generated images often have very low or very uniform noise
        suspicious = noise < 50 or (noise > 200 and noise < 300)
        
        return {
            "noise_variance": float(noise),
            "suspicious": suspicious,
            "reason": "Unusual noise patterns detected" if suspicious else "Normal noise patterns"
        }
    
    def _check_compression_artifacts(self, image) -> Dict[str, Any]:
        """Check for compression artifacts"""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Look for JPEG compression artifacts
        # AI images often lack natural compression artifacts
        edges = cv2.Canny(gray, 50, 150)
        edge_density = np.sum(edges > 0) / edges.size
        
        # Very clean edges might indicate AI generation
        suspicious = edge_density < 0.01 or edge_density > 0.1
        
        return {
            "edge_density": float(edge_density),
            "suspicious": suspicious,
            "reason": "Unusual edge characteristics" if suspicious else "Normal compression artifacts"
        }
    
    def _check_pixel_consistency(self, image) -> Dict[str, Any]:
        """Check pixel-level consistency"""
        # Convert to LAB color space for better analysis
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        
        # Calculate color distribution
        hist_l = cv2.calcHist([lab], [0], None, [256], [0, 256])
        hist_a = cv2.calcHist([lab], [1], None, [256], [0, 256])
        hist_b = cv2.calcHist([lab], [2], None, [256], [0, 256])
        
        # AI images often have unusual color distributions
        l_entropy = self._calculate_entropy(hist_l)
        
        suspicious = l_entropy < 4.0 or l_entropy > 7.5
        
        return {
            "luminance_entropy": float(l_entropy),
            "suspicious": suspicious,
            "reason": "Unusual color distribution" if suspicious else "Normal color distribution"
        }
    
    def _frequency_domain_analysis(self, image) -> Dict[str, Any]:
        """Analyze frequency domain characteristics"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply FFT
        f_transform = np.fft.fft2(gray)
        f_shift = np.fft.fftshift(f_transform)
        magnitude_spectrum = np.log(np.abs(f_shift) + 1)
        
        # Calculate frequency characteristics
        center = np.array(magnitude_spectrum.shape) // 2
        high_freq_energy = np.sum(magnitude_spectrum[center[0]-50:center[0]+50, center[1]-50:center[1]+50])
        total_energy = np.sum(magnitude_spectrum)
        
        high_freq_ratio = high_freq_energy / total_energy if total_energy > 0 else 0
        
        # AI images often have different frequency characteristics
        suspicious = high_freq_ratio < 0.1 or high_freq_ratio > 0.4
        
        return {
            "high_frequency_ratio": float(high_freq_ratio),
            "suspicious": suspicious,
            "reason": "Unusual frequency distribution" if suspicious else "Normal frequency distribution"
        }
    
    def _calculate_entropy(self, histogram):
        """Calculate entropy of histogram"""
        histogram = histogram.flatten()
        histogram = histogram[histogram > 0]
        if len(histogram) <= 1:
            return 0
        
        probabilities = histogram / np.sum(histogram)
        entropy = -np.sum(probabilities * np.log2(probabilities))
        return entropy
    
    def _analyze_metadata(self, image_path: str) -> Dict[str, Any]:
        """Analyze image metadata for AI indicators"""
        try:
            from PIL import Image
            from PIL.ExifTags import TAGS
            
            image = Image.open(image_path)
            exifdata = image.getexif()
            
            metadata_info = {}
            ai_indicators = []
            
            for tag_id in exifdata:
                tag = TAGS.get(tag_id, tag_id)
                data = exifdata.get(tag_id)
                metadata_info[tag] = str(data)
                
                # Check for AI-related software tags
                if isinstance(data, str):
                    ai_keywords = ['ai', 'artificial', 'generated', 'synthetic', 'midjourney', 'dall-e', 'stable diffusion']
                    if any(keyword in data.lower() for keyword in ai_keywords):
                        ai_indicators.append(f"AI software detected: {data}")
            
            # Check for missing typical camera metadata
            camera_tags = ['Make', 'Model', 'DateTime', 'GPS']
            missing_camera_data = [tag for tag in camera_tags if tag not in metadata_info]
            
            if len(missing_camera_data) > 2:
                ai_indicators.append("Missing typical camera metadata")
            
            suspicious = len(ai_indicators) > 0
            confidence = min(len(ai_indicators) / 3.0, 1.0)
            
            return {
                "method": "metadata_analysis",
                "is_ai": suspicious,
                "confidence": confidence,
                "indicators": ai_indicators,
                "metadata": metadata_info
            }
            
        except Exception as e:
            return {
                "method": "metadata_analysis",
                "is_ai": False,
                "confidence": 0.0,
                "error": str(e)
            }
    
    def _combine_detection_results(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """Combine results from multiple detection methods"""
        methods = results["detection_methods"]
        
        if not methods:
            return results
        
        # Calculate weighted average
        total_confidence = 0.0
        total_weight = 0.0
        ai_votes = 0
        
        weights = {
            "huggingface_ai_detector": 0.4,
            "technical_analysis": 0.35,
            "metadata_analysis": 0.25
        }
        
        for method in methods:
            if "error" not in method:
                weight = weights.get(method["method"], 0.2)
                total_confidence += method["confidence"] * weight
                total_weight += weight
                
                if method["is_ai"]:
                    ai_votes += 1
        
        if total_weight > 0:
            results["confidence"] = total_confidence / total_weight
            results["is_ai_generated"] = ai_votes >= 2 or results["confidence"] > 0.7
        
        return results

# Global instance
ai_detector = AIDetectionService()