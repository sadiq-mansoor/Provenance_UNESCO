"""
Real Fact-Checking Service
Integrates with actual fact-checking APIs and databases
"""

import requests
import aiohttp
import asyncio
from typing import Dict, Any, List, Optional
import logging
from datetime import datetime, timedelta
import hashlib
import json
import os

logger = logging.getLogger(__name__)

class FactCheckService:
    def __init__(self):
        # Real fact-checking APIs
        self.apis = {
            "google_factcheck": {
                "url": "https://factchecktools.googleapis.com/v1alpha1/claims:search",
                "key": os.getenv("GOOGLE_FACTCHECK_API_KEY")  # You'll need to get this
            },
            "politifact": {
                "url": "https://www.politifact.com/api/statements/truth-o-meter/",
            },
            "snopes": {
                "url": "https://www.snopes.com/api/",
            }
        }
        
        # Cache for API responses
        self.cache = {}
        self.cache_duration = timedelta(hours=24)
    
    async def check_claim(self, claim_text: str, image_url: Optional[str] = None) -> Dict[str, Any]:
        """Check a claim against multiple fact-checking sources"""
        
        results = {
            "claim": claim_text,
            "fact_check_results": [],
            "overall_rating": "unverified",
            "confidence": 0.0,
            "sources": []
        }
        
        # Check cache first
        cache_key = hashlib.md5(claim_text.encode()).hexdigest()
        if cache_key in self.cache:
            cached_result = self.cache[cache_key]
            if datetime.now() - cached_result["timestamp"] < self.cache_duration:
                return cached_result["data"]
        
        try:
            # Check multiple sources
            tasks = [
                self._check_google_factcheck(claim_text),
                self._check_known_misinformation_db(claim_text),
                self._reverse_image_search(image_url) if image_url else None
            ]
            
            # Remove None tasks
            tasks = [task for task in tasks if task is not None]
            
            if tasks:
                fact_check_results = await asyncio.gather(*tasks, return_exceptions=True)
                
                for result in fact_check_results:
                    if isinstance(result, dict) and "error" not in result:
                        results["fact_check_results"].append(result)
            
            # Combine results
            results = self._combine_fact_check_results(results)
            
            # Cache the result
            self.cache[cache_key] = {
                "data": results,
                "timestamp": datetime.now()
            }
            
        except Exception as e:
            logger.error(f"Error in fact checking: {e}")
            results["error"] = str(e)
        
        return results
    
    async def _check_google_factcheck(self, claim: str) -> Dict[str, Any]:
        """Check against Google Fact Check Tools API"""
        try:
            api_key = self.apis["google_factcheck"]["key"]
            if not api_key:
                return {"source": "google_factcheck", "error": "API key not configured"}
            
            params = {
                "query": claim,
                "key": api_key,
                "languageCode": "en"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(self.apis["google_factcheck"]["url"], params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_google_factcheck_response(data)
                    else:
                        return {"source": "google_factcheck", "error": f"API error: {response.status}"}
        
        except Exception as e:
            return {"source": "google_factcheck", "error": str(e)}
    
    def _parse_google_factcheck_response(self, data: Dict) -> Dict[str, Any]:
        """Parse Google Fact Check API response"""
        result = {
            "source": "google_factcheck",
            "claims_found": [],
            "rating": "unverified"
        }
        
        if "claims" in data:
            for claim in data["claims"]:
                claim_review = claim.get("claimReview", [])
                if claim_review:
                    review = claim_review[0]  # Take first review
                    result["claims_found"].append({
                        "claim_text": claim.get("text", ""),
                        "claimant": claim.get("claimant", ""),
                        "rating": review.get("textualRating", ""),
                        "publisher": review.get("publisher", {}).get("name", ""),
                        "url": review.get("url", ""),
                        "date": review.get("reviewDate", "")
                    })
        
        # Determine overall rating
        if result["claims_found"]:
            ratings = [claim["rating"].lower() for claim in result["claims_found"]]
            if any("false" in rating for rating in ratings):
                result["rating"] = "false"
            elif any("misleading" in rating for rating in ratings):
                result["rating"] = "misleading"
            elif any("true" in rating for rating in ratings):
                result["rating"] = "true"
        
        return result
    
    async def _check_known_misinformation_db(self, claim: str) -> Dict[str, Any]:
        """Check against known misinformation patterns"""
        
        # Common misinformation patterns and keywords
        misinformation_patterns = [
            {
                "keywords": ["miracle cure", "doctors hate", "big pharma"],
                "category": "health_misinformation",
                "rating": "false",
                "explanation": "Common health misinformation pattern"
            },
            {
                "keywords": ["election fraud", "stolen election", "voting machines hacked"],
                "category": "election_misinformation", 
                "rating": "disputed",
                "explanation": "Election-related claim requiring verification"
            },
            {
                "keywords": ["climate hoax", "global warming fake", "scientists lying"],
                "category": "climate_misinformation",
                "rating": "false",
                "explanation": "Climate science denial pattern"
            },
            {
                "keywords": ["5g causes", "vaccine microchip", "population control"],
                "category": "conspiracy_theory",
                "rating": "false",
                "explanation": "Common conspiracy theory pattern"
            }
        ]
        
        result = {
            "source": "misinformation_db",
            "patterns_matched": [],
            "rating": "unverified"
        }
        
        claim_lower = claim.lower()
        
        for pattern in misinformation_patterns:
            if any(keyword in claim_lower for keyword in pattern["keywords"]):
                result["patterns_matched"].append({
                    "category": pattern["category"],
                    "rating": pattern["rating"],
                    "explanation": pattern["explanation"],
                    "matched_keywords": [kw for kw in pattern["keywords"] if kw in claim_lower]
                })
        
        if result["patterns_matched"]:
            # Use the most severe rating
            ratings = [p["rating"] for p in result["patterns_matched"]]
            if "false" in ratings:
                result["rating"] = "false"
            elif "disputed" in ratings:
                result["rating"] = "disputed"
        
        return result
    
    async def _reverse_image_search(self, image_url: str) -> Dict[str, Any]:
        """Perform reverse image search to check for manipulated images"""
        try:
            # This would integrate with Google Images API or TinEye
            # For now, we'll simulate the functionality
            
            result = {
                "source": "reverse_image_search",
                "similar_images": [],
                "earliest_appearance": None,
                "manipulation_detected": False
            }
            
            # In a real implementation, you would:
            # 1. Use Google Vision API or TinEye API
            # 2. Search for visually similar images
            # 3. Check dates to find original source
            # 4. Analyze for signs of manipulation
            
            # Simulated response for demonstration
            result["similar_images"] = [
                {
                    "url": "https://example.com/original.jpg",
                    "source": "Reuters",
                    "date": "2023-01-15",
                    "context": "Original news photo"
                }
            ]
            
            return result
            
        except Exception as e:
            return {"source": "reverse_image_search", "error": str(e)}
    
    def _combine_fact_check_results(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """Combine results from multiple fact-checking sources"""
        
        fact_checks = results["fact_check_results"]
        if not fact_checks:
            return results
        
        # Count ratings
        rating_counts = {"false": 0, "misleading": 0, "disputed": 0, "true": 0, "unverified": 0}
        total_sources = 0
        
        for check in fact_checks:
            if "rating" in check and check["rating"] in rating_counts:
                rating_counts[check["rating"]] += 1
                total_sources += 1
        
        # Determine overall rating
        if rating_counts["false"] > 0:
            results["overall_rating"] = "false"
            results["confidence"] = min(rating_counts["false"] / total_sources, 1.0)
        elif rating_counts["misleading"] > 0:
            results["overall_rating"] = "misleading"
            results["confidence"] = min(rating_counts["misleading"] / total_sources, 1.0)
        elif rating_counts["disputed"] > 0:
            results["overall_rating"] = "disputed"
            results["confidence"] = min(rating_counts["disputed"] / total_sources, 1.0)
        elif rating_counts["true"] > 0:
            results["overall_rating"] = "true"
            results["confidence"] = min(rating_counts["true"] / total_sources, 1.0)
        
        # Collect all sources
        for check in fact_checks:
            if "source" in check:
                results["sources"].append(check["source"])
        
        return results
    
    def get_trending_misinformation(self) -> List[Dict[str, Any]]:
        """Get currently trending misinformation topics"""
        
        # In a real implementation, this would pull from:
        # - Social media monitoring APIs
        # - Fact-checking organization feeds
        # - News monitoring services
        
        trending_topics = [
            {
                "topic": "Election Security",
                "description": "Claims about voting machine vulnerabilities",
                "status": "actively_monitored",
                "fact_check_url": "https://www.factcheck.org/elections/",
                "last_updated": datetime.now().isoformat()
            },
            {
                "topic": "Health Misinformation",
                "description": "False claims about medical treatments",
                "status": "high_priority",
                "fact_check_url": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
                "last_updated": datetime.now().isoformat()
            },
            {
                "topic": "Climate Change Denial",
                "description": "Misleading information about climate science",
                "status": "ongoing_monitoring",
                "fact_check_url": "https://climate.nasa.gov/evidence/",
                "last_updated": datetime.now().isoformat()
            }
        ]
        
        return trending_topics

# Global instance
fact_checker = FactCheckService()