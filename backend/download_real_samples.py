#!/usr/bin/env python3
"""
Download Real Media Samples
Downloads authentic media samples from verified news sources
"""

import requests
import os
import json
from datetime import datetime
from typing import List, Dict, Any
import hashlib
from urllib.parse import urlparse
import time

class RealMediaDownloader:
    def __init__(self):
        self.output_dir = "../verified-media"
        self.metadata_file = "verified_samples_metadata.json"
        
        # Create output directory
        os.makedirs(self.output_dir, exist_ok=True)
        
        # Verified news sources with their RSS/API endpoints
        self.sources = {
            "reuters": {
                "name": "Reuters",
                "rss_url": "https://feeds.reuters.com/reuters/topNews",
                "credibility": "very_high",
                "editorial_standards": "highest"
            },
            "ap_news": {
                "name": "Associated Press",
                "rss_url": "https://feeds.apnews.com/rss/apf-topnews",
                "credibility": "very_high", 
                "editorial_standards": "highest"
            },
            "bbc": {
                "name": "BBC News",
                "rss_url": "http://feeds.bbci.co.uk/news/rss.xml",
                "credibility": "high",
                "editorial_standards": "high"
            },
            "npr": {
                "name": "NPR",
                "rss_url": "https://feeds.npr.org/1001/rss.xml",
                "credibility": "high",
                "editorial_standards": "high"
            }
        }
        
        self.downloaded_samples = []
    
    def download_verified_samples(self, max_per_source: int = 5) -> List[Dict[str, Any]]:
        """Download verified media samples from news sources"""
        
        print("🔍 Downloading verified media samples from trusted news sources...")
        
        for source_id, source_info in self.sources.items():
            print(f"\n📰 Processing {source_info['name']}...")
            
            try:
                samples = self._download_from_source(source_id, source_info, max_per_source)
                self.downloaded_samples.extend(samples)
                
                # Rate limiting to be respectful
                time.sleep(2)
                
            except Exception as e:
                print(f"❌ Error processing {source_info['name']}: {e}")
        
        # Save metadata
        self._save_metadata()
        
        print(f"\n✅ Downloaded {len(self.downloaded_samples)} verified samples")
        return self.downloaded_samples
    
    def _download_from_source(self, source_id: str, source_info: Dict[str, Any], max_samples: int) -> List[Dict[str, Any]]:
        """Download samples from a specific news source"""
        
        samples = []
        
        try:
            # Parse RSS feed
            import feedparser
            
            feed = feedparser.parse(source_info["rss_url"])
            
            for i, entry in enumerate(feed.entries[:max_samples]):
                if i >= max_samples:
                    break
                
                # Look for images in the entry
                image_url = self._extract_image_url(entry)
                
                if image_url:
                    sample = self._download_image_sample(
                        source_id, source_info, entry, image_url, i
                    )
                    if sample:
                        samples.append(sample)
        
        except ImportError:
            print("📦 Installing feedparser for RSS parsing...")
            os.system("pip install feedparser")
            # Retry after installation
            return self._download_from_source(source_id, source_info, max_samples)
        
        except Exception as e:
            print(f"❌ Error downloading from {source_info['name']}: {e}")
        
        return samples
    
    def _extract_image_url(self, entry) -> str:
        """Extract image URL from RSS entry"""
        
        # Try different methods to find images
        image_url = None
        
        # Method 1: Media content
        if hasattr(entry, 'media_content'):
            for media in entry.media_content:
                if media.get('type', '').startswith('image/'):
                    image_url = media.get('url')
                    break
        
        # Method 2: Enclosures
        if not image_url and hasattr(entry, 'enclosures'):
            for enclosure in entry.enclosures:
                if enclosure.get('type', '').startswith('image/'):
                    image_url = enclosure.get('href')
                    break
        
        # Method 3: Look in description/summary for img tags
        if not image_url:
            import re
            content = entry.get('summary', '') + entry.get('description', '')
            img_match = re.search(r'<img[^>]+src="([^"]+)"', content)
            if img_match:
                image_url = img_match.group(1)
        
        return image_url
    
    def _download_image_sample(self, source_id: str, source_info: Dict[str, Any], 
                              entry, image_url: str, index: int) -> Dict[str, Any]:
        """Download individual image sample"""
        
        try:
            # Generate filename
            url_hash = hashlib.md5(image_url.encode()).hexdigest()[:8]
            filename = f"{source_id}_{index}_{url_hash}.jpg"
            filepath = os.path.join(self.output_dir, filename)
            
            # Download image
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(image_url, headers=headers, timeout=30)
            response.raise_for_status()
            
            # Save image
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            # Create sample metadata
            sample = {
                "id": f"{source_id}_{index}_{url_hash}",
                "filename": filename,
                "filepath": filepath,
                "source": {
                    "id": source_id,
                    "name": source_info["name"],
                    "credibility": source_info["credibility"],
                    "editorial_standards": source_info["editorial_standards"],
                    "original_url": entry.get('link', ''),
                    "rss_url": source_info["rss_url"]
                },
                "content": {
                    "title": entry.get('title', ''),
                    "description": entry.get('summary', ''),
                    "published_date": entry.get('published', ''),
                    "category": self._categorize_content(entry.get('title', '') + ' ' + entry.get('summary', ''))
                },
                "verification": {
                    "verified_authentic": True,
                    "verification_method": "trusted_news_source",
                    "download_date": datetime.now().isoformat(),
                    "original_image_url": image_url
                },
                "technical": {
                    "file_size": os.path.getsize(filepath),
                    "format": "JPEG"
                }
            }
            
            print(f"  ✅ Downloaded: {filename}")
            return sample
            
        except Exception as e:
            print(f"  ❌ Failed to download {image_url}: {e}")
            return None
    
    def _categorize_content(self, text: str) -> str:
        """Categorize content based on keywords"""
        
        text_lower = text.lower()
        
        categories = {
            "politics": ["election", "vote", "government", "politics", "congress", "senate"],
            "disaster": ["hurricane", "earthquake", "flood", "fire", "disaster", "emergency"],
            "international": ["war", "conflict", "international", "global", "world"],
            "business": ["economy", "market", "business", "financial", "stock"],
            "health": ["health", "medical", "hospital", "disease", "vaccine"],
            "technology": ["technology", "tech", "digital", "cyber", "ai"],
            "sports": ["sports", "game", "championship", "olympic", "football"],
            "general": []  # Default category
        }
        
        for category, keywords in categories.items():
            if any(keyword in text_lower for keyword in keywords):
                return category
        
        return "general"
    
    def _save_metadata(self):
        """Save metadata about downloaded samples"""
        
        metadata = {
            "download_session": {
                "date": datetime.now().isoformat(),
                "total_samples": len(self.downloaded_samples),
                "sources_used": list(self.sources.keys())
            },
            "samples": self.downloaded_samples,
            "verification_info": {
                "all_samples_verified": True,
                "verification_method": "trusted_news_sources",
                "editorial_oversight": True,
                "fact_checked": True
            }
        }
        
        metadata_path = os.path.join(self.output_dir, self.metadata_file)
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print(f"💾 Saved metadata to {metadata_path}")
    
    def create_ai_comparison_samples(self):
        """Create AI-generated samples for comparison"""
        
        print("\n🤖 Note: To create AI comparison samples, you would:")
        print("1. Use DALL-E 3, Midjourney, or Stable Diffusion")
        print("2. Generate images with similar themes to the authentic samples")
        print("3. Save them with proper AI generation metadata")
        print("4. Include watermarks or content credentials where available")
        
        # Create placeholder AI samples metadata
        ai_samples = []
        
        for i in range(5):
            ai_sample = {
                "id": f"ai_sample_{i}",
                "filename": f"ai_generated_{i}.jpg",
                "source": {
                    "name": "AI Generator",
                    "type": "artificial_intelligence"
                },
                "generation": {
                    "model": "Stable Diffusion XL",
                    "prompt": f"Professional news photo style image {i}",
                    "generated_date": datetime.now().isoformat(),
                    "watermark": "none",
                    "content_credentials": False
                },
                "verification": {
                    "verified_ai": True,
                    "detection_difficulty": "medium"
                }
            }
            ai_samples.append(ai_sample)
        
        # Save AI samples metadata
        ai_metadata_path = os.path.join(self.output_dir, "ai_samples_metadata.json")
        with open(ai_metadata_path, 'w') as f:
            json.dump({
                "ai_samples": ai_samples,
                "note": "These are metadata templates. Actual AI images need to be generated separately."
            }, f, indent=2)

def main():
    """Main function to download real media samples"""
    
    print("🚀 Real Media Sample Downloader")
    print("=" * 50)
    
    downloader = RealMediaDownloader()
    
    # Download verified samples
    samples = downloader.download_verified_samples(max_per_source=3)
    
    # Create AI comparison info
    downloader.create_ai_comparison_samples()
    
    print("\n📋 Summary:")
    print(f"✅ Downloaded {len(samples)} verified authentic samples")
    print(f"📁 Saved to: {downloader.output_dir}")
    print(f"📄 Metadata: {downloader.metadata_file}")
    
    print("\n🎯 Next Steps:")
    print("1. Review downloaded samples in the verified-media folder")
    print("2. Generate AI comparison samples using your preferred AI tool")
    print("3. Update the backend to use these real samples")
    print("4. Test the enhanced detection capabilities")

if __name__ == "__main__":
    main()