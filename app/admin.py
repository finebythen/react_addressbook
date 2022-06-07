from django.contrib import admin
from .models import Address


class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'last_name', 'first_name', 'email', 'country',)
    prepopulated_fields = {'slug': ('last_name', 'first_name',)}
    
admin.site.register(Address, AddressAdmin)