from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# API view to list all notes of the authenticated user and allow them to create a new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer  # Specifies the serializer to be used for this view
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    # Returns the queryset of notes belonging to the authenticated user
    def get_queryset(self):
        user = self.request.user  # Get the current authenticated user
        return Note.objects.filter(author=user)  # Return notes authored by this user

    # Custom behavior when creating a new note
    def perform_create(self, serializer):
        if serializer.is_valid():  # Check if the serializer is valid
            serializer.save(author=self.request.user)  # Save the note with the current user as the author
        else:
            print(serializer.errors)  # Print errors if the serializer is not valid (for debugging)

# API view to delete a note belonging to the authenticated user
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer  # Specifies the serializer to be used for this view
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    # Returns the queryset of notes belonging to the authenticated user that can be deleted
    def get_queryset(self):
        user = self.request.user  # Get the current authenticated user
        return Note.objects.filter(author=user)  # Return notes authored by this user

# API view to create a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Specifies the queryset used for this view
    serializer_class = UserSerializer  # Specifies the serializer to be used for this view
    permission_classes = [AllowAny]  # Anyone, authenticated or not, can access this view
