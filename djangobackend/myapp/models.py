# models.py
from django.db import models
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from  django.contrib.auth.models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    def get_serializer_class(self):
        from myapp.serializers import RegisterSerializer
        return RegisterSerializer
class ObtainTokenView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        refresh = RefreshToken.for_user(request.user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

# class PlayerInventory(models.Model):
#     player = models.ForeignKey(User, on_delete=models.CASCADE)
#     item = models.ForeignKey(Item, on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=0)

