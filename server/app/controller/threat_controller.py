from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.service.threat_service import ThreatService

router = APIRouter()
threat_service = ThreatService()


# IP kontrolü için route
@router.get("/check-ip/{ip_address}")
def check_ip(ip_address: str):
    virustotal_info = threat_service.check_ip_threat(ip_address)
    shodan_info = threat_service.check_ip_shodan(ip_address)

    return {
        "Virustotal": virustotal_info,
        "Shodan": shodan_info
    }


# Domain kontrolü için route
@router.get("/check-domain/{domain_name}")
def check_domain(domain_name: str):
    return threat_service.check_domain_threat(domain_name)
