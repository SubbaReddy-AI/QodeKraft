import hashlib
import hmac
from typing import Any

import httpx

from app.config import settings


RAZORPAY_BASE_URL = "https://api.razorpay.com/v1"


def _credentials() -> tuple[str, str]:
    if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
        raise RuntimeError("Razorpay credentials are not configured on the server.")
    return settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET


def create_order(amount_rupees: int, receipt: str, notes: dict[str, str]) -> dict[str, Any]:
    key_id, key_secret = _credentials()
    payload = {
        "amount": amount_rupees * 100,
        "currency": "INR",
        "receipt": receipt,
        "notes": notes,
        "capture": "automatic",
    }
    response = httpx.post(
        f"{RAZORPAY_BASE_URL}/orders",
        auth=(key_id, key_secret),
        json=payload,
        timeout=20,
    )
    response.raise_for_status()
    return response.json()


def fetch_payment(payment_id: str) -> dict[str, Any]:
    key_id, key_secret = _credentials()
    response = httpx.get(
        f"{RAZORPAY_BASE_URL}/payments/{payment_id}",
        auth=(key_id, key_secret),
        timeout=20,
    )
    response.raise_for_status()
    return response.json()


def verify_signature(order_id: str, payment_id: str, signature: str) -> bool:
    _, key_secret = _credentials()
    message = f"{order_id}|{payment_id}".encode()
    expected = hmac.new(
        key_secret.encode(), message, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


def payment_reference_values(payment: dict[str, Any]) -> set[str]:
    """Return reference numbers Razorpay exposes for this payment.

    UPI payments commonly expose an RRN in acquirer_data. Other payment methods
    may expose bank_transaction_id or another acquirer reference instead.
    """
    values: set[str] = set()
    acquirer = payment.get("acquirer_data") or {}
    if isinstance(acquirer, dict):
        for key in (
            "rrn",
            "utr",
            "bank_transaction_id",
            "transaction_id",
            "arn",
            "authentication_reference_number",
        ):
            value = acquirer.get(key)
            if value:
                values.add(str(value).strip().upper())
    return values
