from django.core.management.base import BaseCommand
from ...models import Address


class Command(BaseCommand):
    def handle(self, *args, **options):
        addresses = Address.objects.count()
        if addresses == 0:
            count = 0
            l_address = []
            for i in range(0, 10):
                count += 1
                l_address.append(
                    Address(
                        first_name=f"First Name {i}",
                        last_name=f"Last Name {i}",
                        email=f"first{i}.last{i}@email.com",
                        country=f"Country {i}",
                        slug=f"first-name-{i}-last-name-{i}"
                    )
                )

            Address.objects.bulk_create(l_address)

            print('*' * 25)
            print("Der Befehl 'insert_db' wurde erfolgreich ausgeführt.")
            print('*' * 25)
        else:
            print('*' * 25)
            print("Die Datenbank enthält noch Einträge!")
            print("Führen Sie zuerst den Befehl 'clear_db' aus.")
            print('*' * 25)