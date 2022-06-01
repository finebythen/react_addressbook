from audioop import add
from rest_framework import serializers
from ..models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'first_name',
            'last_name',
            'email',
            'country',
        ]