import os
from qwhale_client import APIClient
from dotenv import load_dotenv
import redis


class DB:
    _instance = None

    @staticmethod
    def get_instance():
        if DB._instance is None:
            raise RuntimeError("You mast initialize DB singleton first")
        return DB._instance

    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db="links")
        load_dotenv(".env")
        token = os.getenv("QWHALE_TOKEN")
        self.client = APIClient(token)
        self.db = self.client.get_database()
        self.links = self.db.get_collection("links")
        if len(list(self.links.list_indexes())) < 2:
            self.links.create_index("short_link")
        DB._instance = self

    def add_link(self, long_link: str, short_link: str):
        self.redis.set(short_link, long_link)
        return self.links.insert_one({"long_link": long_link, "short_link": short_link})

    def get_link(self, short_link: str):
        redis_value = self.redis.get(short_link)
        if redis_value is not None:
            self.redis.set(short_link, redis_value.decode())
            return redis_value.decode()
        mongo_value = self.links.find_one({"short_link": short_link})
        if mongo_value is not None:
            mongo_value = mongo_value["long_link"]
        if mongo_value is not None:
            self.redis.set(short_link, mongo_value)
        return mongo_value

    def close(self):
        self.client.close()
