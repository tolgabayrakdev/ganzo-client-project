import os
import requests
from ..database import SessionLocal


class ThreatService:

    def __init__(self):
        self.db = SessionLocal()
        self.virustotal_api_key = os.getenv("VIRUSTOTAL_API_KEY")
        self.shodan_api_key = os.getenv("SHODAN_API_KEY")
        self.virustotal_base_url = "https://www.virustotal.com/vtapi/v2/"
        self.shodan_base_url = "https://api.shodan.io/shodan/host/"

    def check_ip_threat(self, ip_address: str):
        # Virustotal API'ye istek yap
        url = f"{self.virustotal_base_url}ip-address/report"
        params = {
            'apikey': self.virustotal_api_key,
            'ip': ip_address
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()

            # Dönen veriyi işleyip kullanıcıya anlamlı şekilde sunabiliriz
            threat_info = {
                "IP Address": ip_address,
                "Country": data.get("country"),
                "Detected URLs": data.get("detected_urls", []),
                "Positive Detections": data.get("positives"),
                "Total Scans": data.get("total"),
                "Threat Level": "High" if data.get("positives", 0) > 0 else "Low"
            }
            return threat_info
        else:
            return {"error": "Virustotal API failed to respond"}

    def check_domain_threat(self, domain_name: str):
        # Virustotal API'ye domain için istek yap
        url = f"{self.virustotal_base_url}domain/report"
        params = {
            'apikey': self.virustotal_api_key,
            'domain': domain_name
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()

            threat_info = {
                "Domain": domain_name,
                "Webutation Verdict": data.get("Webutation domain info", {}).get("Verdict"),
                "Positive Detections": data.get("positives"),
                "Total Scans": data.get("total"),
                "Threat Level": "High" if data.get("positives", 0) > 0 else "Low"
            }
            return threat_info
        else:
            return {"error": "Virustotal API failed to respond"}
        
    def check_ip_shodan(self, ip_address: str):
        url = f"{self.shodan_base_url}{ip_address}"
        params = {
                'key': self.shodan_api_key
            }

        response = requests.get(url, params=params)
        
        if response.status_code == 200:
                data = response.json()

                # Shodan verisini işleyelim
                shodan_info = {
                    "IP Address": ip_address,
                    "Ports": [service.get("port") for service in data.get("data", [])],
                    "Vulnerabilities": data.get("vulns", {}),
                    "Hostnames": data.get("hostnames", []),
                    "Organization": data.get("org", "N/A"),
                    "Operating System": data.get("os", "N/A")
                }
                return shodan_info
        else:
                return {"error": "Shodan API failed to respond"}
           