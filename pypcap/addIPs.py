from pymongo import MongoClient
from config import MONGO_DB_ADDRESS

client = MongoClient(MONGO_DB_ADDRESS, serverSelectionTimeoutMS=1)
scapy_database = client['scapy']
ip_collection = scapy_database['ips']


def main():
    fileName = 'ips.txt'
    ipList = []

    fileIPs = open(fileName, 'r')

    for line in fileIPs:
        ip, name = line.strip().split(' ')
        ipList.append({
            'ip': ip,
            'name': name
        })

    ip_collection.insert_many(ipList)


if __name__ == '__main__':
    main()
