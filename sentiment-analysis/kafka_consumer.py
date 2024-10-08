
from json import loads
from kafka import KafkaConsumer
from feedback_analyzer import get_sentiment

consumer = KafkaConsumer('feedback-submitted',
                         bootstrap_servers=['localhost:9092'],
                         )


while True:
    try:
        records = consumer.poll(timeout_ms=2000)

        for topic_data, consumer_records in records.items():
            for consumer_record in consumer_records:
                id = consumer_record.key.decode('utf-8')
                feedback = consumer_record.value.decode('utf-8')
                score = get_sentiment(feedback)

                print(id)
                print(feedback)
                print(score)

                category = "neutral"

                if score > 0.2:
                    category = "positive"
                if score <= -0.2:
                    category = "negative"

                print(category)

        continue
    except Exception as e:
        print(e)
        continue
