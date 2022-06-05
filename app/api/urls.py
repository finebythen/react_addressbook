from django.urls import path
from .views import AddressListCreateAPIView, AddressRetrieveUpdateDestroyView


urlpatterns = [
    path('address/', AddressListCreateAPIView.as_view(), name='address-list'),
    path('address/<int:pk>/', AddressRetrieveUpdateDestroyView.as_view(), name='address-detail'),
]