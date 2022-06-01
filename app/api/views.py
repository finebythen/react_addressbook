from ast import Add
from rest_framework.generics import ListCreateAPIView
from .serializers import AddressSerializer
from ..models import Address


class AddressListCreateAPIView(ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer