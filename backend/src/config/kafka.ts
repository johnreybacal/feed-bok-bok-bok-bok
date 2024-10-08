import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'feed-bok-bok-bok-bok-server',
    brokers: [process.env.KAFKA_HOST || "localhost:9092"]
})

export const kafkaProducer = kafka.producer();
