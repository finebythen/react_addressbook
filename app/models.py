from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse


class BaseModel(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Address(BaseModel):
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField()
    country = models.CharField(max_length=50, null=True, blank=True)
    slug = models.SlugField(null=False, blank=True, unique=True)    

    class Meta:
        ordering = ['last_name', 'first_name']
        constraints = [
            models.UniqueConstraint(fields=['last_name', 'first_name'], name="unique-name-constraint"),
        ]
        indexes = [
            models.Index(fields=['last_name', 'first_name'], name="address-name-index"),
        ]
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'
    
    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
    
    def get_absolute_url(self):
        return reverse('address-detail', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        self.slug = slugify(f"{self.last_name}-{self.first_name}") if not self.slug else self.slug
        self.slug = slugify(f"{self.last_name}-{self.first_name}") if self.slug == '' else self.slug
        super(Address, self).save(*args, **kwargs)
        



