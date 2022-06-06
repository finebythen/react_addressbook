from django.core.management.base import BaseCommand
from ...models import Address


class Command(BaseCommand):
    def handle(self, *args, **options):
        count = Address.objects.count()
        Address.objects.all().delete()
        print('*' * 25)
        print("Der Befehl 'clear_db' wurde erfolgreich ausgeführt.")
        print(f"Es wurden {count} aus der DB gelöscht!")
        print('*' * 25)