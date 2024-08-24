"""
This code defines two serializers for a Django REST Framework API. The UserSerializer 
converts User model instances to and from JSON, including fields like id, username, and 
password, while ensuring that passwords are securely hashed when creating new users. The
NoteSerializer handles the Note model, converting it to and from JSON and specifying 
fields such as id, title, content, created_at, and a read-only author field.
"""

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Serializer to convert User model instances into JSON format and vice versa
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specifies that this serializer works with the Django User model
        fields = ["id", "username", "password"]  # The fields to include in the serialized data
        extra_kwargs = {"password": {"write_only": True}}  # Ensures password is only used for input, not output

    # Method to handle creating a new User instance
    def create(self, validated_data):
        print(validated_data)  # Prints the validated data for debugging purposes
        # Create a new user with the provided data, ensuring the password is hashed
        user = User.objects.create_user(**validated_data)
        return user  # Return the newly created user instance

# Serializer to convert Note model instances into JSON format and vice versa
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note  # Specifies that this serializer works with the custom Note model
        fields = ["id", "title", "content", "created_at", "author"]  # The fields to include in the serialized data
        extra_kwargs = {"author": {"read_only": True}}  # Makes the author field read-only, preventing it from being modified via the API
