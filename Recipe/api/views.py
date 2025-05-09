from rest_framework import generics, permissions
from .models import Recipe
from .serializers import RecipeSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class RecipeCreate(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(owner = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)
        
        
class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(owner=self.request.user)

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def  get_queryset(self):
        return Recipe.objects.filter(owner = self.request.user)