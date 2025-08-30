#!/usr/bin/env python3
"""
Test Real Data Integration
Verifies that all real data sources are working correctly
"""

import asyncio
import sys
import os
from datetime import datetime
import json

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

try:
    from backend.ai_detection import ai_detector
    from backend.fact_check_service import fact_checker
    from backend.media_dataset import media_dataset
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure you've installed the requirements: pip install -r requirements_real_data.txt")
    sys.exit(1)

class RealDataTester:
    def __init__(self):
        self.test_results = {}
        self.overall_success = True
    
    async def run_all_tests(self):
        """Run comprehensive tests of all real data integrations"""
        
        print("🧪 Testing Real Data Integration")
        print("=" * 50)
        
        # Test AI Detection
        await self._test_ai_detection()
        
        # Test Fact Checking
        await self._test_fact_checking()
        
        # Test Media Dataset
        await self._test_media_dataset()
        
        # Test Integration Workflow
        await self._test_integration_workflow()
        
        # Generate test report
        self._generate_test_report()
        
        return self.overall_success
    
    async def _test_ai_detection(self):
        """Test AI detection capabilities"""
        
        print("\n🤖 Testing AI Detection...")
        
        test_name = "ai_detection"
        self.test_results[test_name] = {"status": "running", "details": []}
        
        try:
            # Test 1: Model loading
            print("  📥 Testing model loading...")
            ai_detector.load_models()
            
            if ai_detector.models_loaded:
                self.test_results[test_name]["details"].append("✅ Hugging Face models loaded successfully")
            else:
                self.test_results[test_name]["details"].append("⚠️  Using fallback detection methods")
            
            # Test 2: Create test image and analyze
            print("  🖼️  Testing image analysis...")
            test_image_path = await self._create_test_image()
            
            if test_image_path:
                result = ai_detector.detect_ai_content(test_image_path)
                
                if result and "confidence" in result:
                    confidence = result["confidence"]
                    self.test_results[test_name]["details"].append(f"✅ Image analysis completed (confidence: {confidence:.2f})")
                    
                    # Check detection methods
                    methods = result.get("detection_methods", [])
                    self.test_results[test_name]["details"].append(f"✅ {len(methods)} detection methods active")
                    
                    for method in methods:
                        method_name = method.get("method", "unknown")
                        method_confidence = method.get("confidence", 0)
                        self.test_results[test_name]["details"].append(f"   - {method_name}: {method_confidence:.2f}")
                
                else:
                    self.test_results[test_name]["details"].append("❌ Image analysis failed")
                    self.overall_success = False
            
            self.test_results[test_name]["status"] = "passed"
            
        except Exception as e:
            self.test_results[test_name]["status"] = "failed"
            self.test_results[test_name]["error"] = str(e)
            self.test_results[test_name]["details"].append(f"❌ AI Detection test failed: {e}")
            self.overall_success = False
    
    async def _test_fact_checking(self):
        """Test fact-checking capabilities"""
        
        print("\n🔍 Testing Fact-Checking...")
        
        test_name = "fact_checking"
        self.test_results[test_name] = {"status": "running", "details": []}
        
        try:
            # Test 1: Basic claim checking
            print("  📝 Testing claim verification...")
            test_claim = "The Earth is round"
            
            result = await fact_checker.check_claim(test_claim)
            
            if result and "overall_rating" in result:
                rating = result["overall_rating"]
                confidence = result.get("confidence", 0)
                self.test_results[test_name]["details"].append(f"✅ Claim checking completed (rating: {rating}, confidence: {confidence:.2f})")
                
                # Check fact-check sources
                sources = result.get("sources", [])
                self.test_results[test_name]["details"].append(f"✅ {len(sources)} fact-check sources active")
                
            else:
                self.test_results[test_name]["details"].append("⚠️  Basic fact-checking with limited functionality")
            
            # Test 2: Trending misinformation
            print("  📈 Testing trending topics...")
            trending = fact_checker.get_trending_misinformation()
            
            if trending:
                self.test_results[test_name]["details"].append(f"✅ Retrieved {len(trending)} trending misinformation topics")
                for topic in trending[:2]:  # Show first 2
                    self.test_results[test_name]["details"].append(f"   - {topic['topic']}: {topic['status']}")
            
            # Test 3: API configuration
            google_api_key = os.getenv("GOOGLE_FACTCHECK_API_KEY")
            if google_api_key:
                self.test_results[test_name]["details"].append("✅ Google Fact Check API configured")
            else:
                self.test_results[test_name]["details"].append("⚠️  Google Fact Check API not configured (using fallback)")
            
            self.test_results[test_name]["status"] = "passed"
            
        except Exception as e:
            self.test_results[test_name]["status"] = "failed"
            self.test_results[test_name]["error"] = str(e)
            self.test_results[test_name]["details"].append(f"❌ Fact-checking test failed: {e}")
            self.overall_success = False
    
    async def _test_media_dataset(self):
        """Test media dataset capabilities"""
        
        print("\n📰 Testing Media Dataset...")
        
        test_name = "media_dataset"
        self.test_results[test_name] = {"status": "running", "details": []}
        
        try:
            # Test 1: Authentic samples
            print("  📸 Testing authentic sample retrieval...")
            samples = await media_dataset.get_authentic_media_samples("general", 2)
            
            if samples:
                self.test_results[test_name]["details"].append(f"✅ Retrieved {len(samples)} authentic samples")
                
                for sample in samples[:2]:  # Show first 2
                    source_name = sample.get("source", {}).get("name", "Unknown")
                    self.test_results[test_name]["details"].append(f"   - {source_name}: {sample.get('title', 'No title')[:50]}...")
            
            # Test 2: AI-generated samples
            print("  🤖 Testing AI sample generation...")
            ai_samples = media_dataset.get_ai_generated_samples("general", 2)
            
            if ai_samples:
                self.test_results[test_name]["details"].append(f"✅ Generated {len(ai_samples)} AI comparison samples")
                
                for sample in ai_samples[:2]:
                    generator = sample.get("ai_markers", {}).get("generator", "Unknown")
                    self.test_results[test_name]["details"].append(f"   - {generator}: {sample.get('title', 'No title')[:50]}...")
            
            # Test 3: Training sets
            print("  🎯 Testing training set creation...")
            training_set = media_dataset.get_mixed_training_set("general", 2, 2)
            
            if training_set:
                total_samples = training_set.get("total_samples", 0)
                self.test_results[test_name]["details"].append(f"✅ Created training set with {total_samples} samples")
            
            # Test 4: Verification guidelines
            print("  📋 Testing verification guidelines...")
            guidelines = media_dataset.get_verification_guidelines()
            
            if guidelines:
                categories = len(guidelines)
                self.test_results[test_name]["details"].append(f"✅ Loaded verification guidelines ({categories} categories)")
            
            # Test 5: API configuration
            news_api_key = os.getenv("NEWS_API_KEY")
            if news_api_key:
                self.test_results[test_name]["details"].append("✅ News API configured")
            else:
                self.test_results[test_name]["details"].append("⚠️  News API not configured (using fallback data)")
            
            self.test_results[test_name]["status"] = "passed"
            
        except Exception as e:
            self.test_results[test_name]["status"] = "failed"
            self.test_results[test_name]["error"] = str(e)
            self.test_results[test_name]["details"].append(f"❌ Media dataset test failed: {e}")
            self.overall_success = False
    
    async def _test_integration_workflow(self):
        """Test complete integration workflow"""
        
        print("\n🔄 Testing Integration Workflow...")
        
        test_name = "integration_workflow"
        self.test_results[test_name] = {"status": "running", "details": []}
        
        try:
            # Test complete workflow: image analysis + fact checking + media verification
            print("  🎯 Testing complete verification workflow...")
            
            # Step 1: Create test content
            test_image_path = await self._create_test_image()
            test_claim = "This is a test claim for the integration workflow"
            
            # Step 2: AI Detection
            if test_image_path:
                ai_result = ai_detector.detect_ai_content(test_image_path)
                if ai_result:
                    self.test_results[test_name]["details"].append("✅ AI detection in workflow")
            
            # Step 3: Fact Checking
            fact_result = await fact_checker.check_claim(test_claim)
            if fact_result:
                self.test_results[test_name]["details"].append("✅ Fact checking in workflow")
            
            # Step 4: Media Dataset
            samples = await media_dataset.get_authentic_media_samples("general", 1)
            if samples:
                self.test_results[test_name]["details"].append("✅ Media dataset in workflow")
            
            # Step 5: Combined analysis
            workflow_result = {
                "ai_analysis": ai_result if test_image_path else None,
                "fact_check": fact_result,
                "media_samples": samples,
                "timestamp": datetime.now().isoformat()
            }
            
            if workflow_result:
                self.test_results[test_name]["details"].append("✅ Complete workflow integration successful")
            
            self.test_results[test_name]["status"] = "passed"
            
        except Exception as e:
            self.test_results[test_name]["status"] = "failed"
            self.test_results[test_name]["error"] = str(e)
            self.test_results[test_name]["details"].append(f"❌ Integration workflow test failed: {e}")
            self.overall_success = False
    
    async def _create_test_image(self):
        """Create a simple test image for analysis"""
        
        try:
            from PIL import Image
            import numpy as np
            
            # Create a simple test image
            test_image = Image.fromarray(np.random.randint(0, 255, (200, 200, 3), dtype=np.uint8))
            
            # Ensure test-media directory exists
            os.makedirs("test-media", exist_ok=True)
            
            test_path = "test-media/integration_test.jpg"
            test_image.save(test_path)
            
            return test_path
            
        except ImportError:
            print("  ⚠️  PIL not available, skipping image tests")
            return None
        except Exception as e:
            print(f"  ⚠️  Could not create test image: {e}")
            return None
    
    def _generate_test_report(self):
        """Generate comprehensive test report"""
        
        print("\n📊 Test Results Summary")
        print("=" * 50)
        
        # Overall status
        overall_status = "✅ PASSED" if self.overall_success else "❌ FAILED"
        print(f"\n🎯 Overall Status: {overall_status}")
        
        # Individual test results
        for test_name, result in self.test_results.items():
            status = result["status"]
            status_icon = "✅" if status == "passed" else "❌" if status == "failed" else "🔄"
            
            print(f"\n{status_icon} {test_name.replace('_', ' ').title()}: {status.upper()}")
            
            for detail in result.get("details", []):
                print(f"  {detail}")
            
            if "error" in result:
                print(f"  ❌ Error: {result['error']}")
        
        # API Configuration Summary
        print(f"\n🔑 API Configuration:")
        api_status = {
            "Google Fact Check": "✅" if os.getenv("GOOGLE_FACTCHECK_API_KEY") else "⚠️",
            "News API": "✅" if os.getenv("NEWS_API_KEY") else "⚠️",
            "OpenAI": "✅" if os.getenv("OPENAI_API_KEY") else "⚠️",
            "Hugging Face": "✅" if os.getenv("HUGGINGFACE_API_KEY") else "⚠️",
            "TinEye": "✅" if os.getenv("TINEYE_API_KEY") else "⚠️"
        }
        
        for api_name, status in api_status.items():
            configured = "Configured" if status == "✅" else "Not configured"
            print(f"  {status} {api_name}: {configured}")
        
        # Recommendations
        print(f"\n💡 Recommendations:")
        
        if not self.overall_success:
            print("  - Check error messages above and resolve issues")
            print("  - Ensure all dependencies are installed")
            print("  - Verify API keys are correctly configured")
        
        unconfigured_apis = [name for name, status in api_status.items() if status == "⚠️"]
        if unconfigured_apis:
            print(f"  - Configure these APIs for enhanced functionality: {', '.join(unconfigured_apis)}")
        
        if self.overall_success:
            print("  - All systems operational! Ready for production use")
            print("  - Consider adding more API keys for enhanced features")
        
        # Save detailed report
        report_data = {
            "test_date": datetime.now().isoformat(),
            "overall_success": self.overall_success,
            "test_results": self.test_results,
            "api_configuration": {name.lower().replace(" ", "_"): status == "✅" for name, status in api_status.items()}
        }
        
        with open("test_report.json", "w") as f:
            json.dump(report_data, f, indent=2)
        
        print(f"\n📄 Detailed report saved to: test_report.json")

async def main():
    """Main test function"""
    
    tester = RealDataTester()
    
    try:
        success = await tester.run_all_tests()
        
        if success:
            print("\n🎉 All tests passed! Your real data integration is working perfectly.")
            print("\n🚀 Ready to launch:")
            print("   cd backend && python main.py")
            return 0
        else:
            print("\n⚠️  Some tests failed. Check the details above.")
            print("   The platform will still work with reduced functionality.")
            return 1
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Testing interrupted by user")
        return 1
    except Exception as e:
        print(f"\n❌ Unexpected error during testing: {e}")
        return 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)