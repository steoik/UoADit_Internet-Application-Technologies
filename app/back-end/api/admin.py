from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
  ordering = ('role',)
  list_display = ('username', 'email', 'date_joined', 'is_superuser', 'role')
  fieldsets = (
    (None, {'fields': ('username', 'password')}),
    ('Personal Information', {'fields': ('email', 'first_name', 'last_name')}),
    ('Extra Fields', {'fields': ('role', 'phone', 'profile_picture', 'host_request_status')}),
    ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    ('Dates', {'fields': ('last_login', 'date_joined')}),
  )

admin.site.register(CustomUser, UserAdminConfig)