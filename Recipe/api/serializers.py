from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Recipe

class RegisterSerializer(serializers.ModelSerializer):
        email = serializers.EmailField(
                required = True,
                validators = [UniqueValidator(queryset = User.objects.all())]
        )
        password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
        password2 = serializers.CharField(write_only = True, required = True)

        class Meta:
                model = User
                fields = ('username', 'password', 'password2', 'email')

        def validate(self, attrs):
                if attrs['password'] !=  attrs['password2']:
                        raise serializers.ValidationError({"password": "Passwords don't match"})
                return attrs
                
        def create(self, validate_data):
                user = User.objects.create_user(
                        username = validate_data['username'],
                        email = validate_data['email'],
                        password = validate_data['password']
                )

                return user
        

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        read_only_fields = ['owner']