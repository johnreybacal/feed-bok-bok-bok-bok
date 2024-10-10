# sentiment-analysis

## Dependencies

- [nltk](https://www.nltk.org/)
- [kafka-python](https://kafka-python.readthedocs.io/en/master/index.html) (kafka-python-ng)
- [sqlalchemy](https://www.sqlalchemy.org/)
- [pandas](https://pandas.pydata.org/) (for sandbox only)

## Setup

1. Install the dependencies
   ```bash
   pip install nltk kafka-python-ng sqlalchemy
   ```
2. Download NLTK data

   ```python
   import nltk

   nltk.download('all')
   ```

3. Start the service
   ```bash
   py kafka_consumer.py
   ```
