#!/usr/bin/env python3
"""
Test script for the improved ExamDocumentLoader with Arabic text support.
"""

import sys
from pathlib import Path


def test_document_loader():
    """Test the document loader with Arabic text support."""
    
    # Add the api directory to the path
    sys.path.append(str(Path(__file__).parent / "api"))
    
    from document_loader import ExamDocumentLoader
    
    # Initialize the loader
    loader = ExamDocumentLoader("exams")
    
    # Test text analysis function
    print("Testing text analysis function...")
    test_text = "هذا نص تجريبي باللغة العربية This is English text"
    analysis = loader._analyze_extracted_text(test_text, Path("test.txt"))
    print(f"Analysis result: {analysis}")
    
    # Test meaningful text detection
    print("\nTesting meaningful text detection...")
    meaningful = loader._is_meaningful_text(test_text)
    print(f"Is meaningful: {meaningful}")
    
    # Test with just punctuation
    punctuation_text = ":::::---()()()"
    meaningful_punct = loader._is_meaningful_text(punctuation_text)
    print(f"Is punctuation meaningful: {meaningful_punct}")
    
    # Load documents
    print("\nLoading documents...")
    documents = loader.load_documents()
    
    print(f"Loaded {len(documents)} documents")
    
    # Display sample content from each document
    for i, doc in enumerate(documents[:3]):  # Show first 3 documents
        print(f"\nDocument {i+1}:")
        print(f"Subject: {doc.metadata.get('subject', 'Unknown')}")
        print(f"Filename: {doc.metadata.get('filename', 'Unknown')}")
        print(f"Content preview: {doc.page_content[:200]}...")
        
        # Analyze the content
        analysis = loader._analyze_extracted_text(
            doc.page_content, Path(doc.metadata.get('source', ''))
        )
        print(f"Content analysis: {analysis}")


if __name__ == "__main__":
    test_document_loader() 