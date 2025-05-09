from django.urls import path
from .views import RegisterView, RecipeCreate, RecipeDetail, RecipeList
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('register/', RegisterView.as_view(), name= 'register'),
    path('login/', TokenObtainPairView.as_view(), name= 'login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),

    path('create-recipe/', RecipeCreate.as_view(), name= 'recipe'),
    path('recipes/', RecipeList.as_view(), name = "recipe-list"),
    path('recipes/<int:pk>/', RecipeDetail.as_view(), name = "recipe-details")

]
