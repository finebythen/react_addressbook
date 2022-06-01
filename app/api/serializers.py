from audioop import add
from rest_framework import serializers
from ..models import Address


class AddressSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = [
            'id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'country',
        ]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"