from django.urls import path
from .views import AddressListCreateAPIView


urlpatterns = [
    path('address/', AddressListCreateAPIView.as_view(), name='address-list'),
]