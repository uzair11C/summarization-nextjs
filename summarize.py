from transformers import pipeline
import sys
import json

def summarize_text(text, max_length=150, model="t5-small"):
    summarizer = pipeline("summarization", model=model)
    summary = summarizer(text, max_length=max_length, min_length=30, do_sample=False)[0]['summary_text']
    return summary

if __name__ == "__main__":
    input_text = sys.argv[1]
    summary = summarize_text(input_text)
    print(json.dumps({"summary": summary}))
