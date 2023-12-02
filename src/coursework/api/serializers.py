from rest_framework import serializers
from user_logic.models import User, Role, Grant


class RoleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class GrantSerializers(serializers.ModelSerializer):
    class Meta:
        model = Grant
        fields = "__all__"
