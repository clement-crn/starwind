# accounts/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from .serializers import ItemSerializer, UserSerializer
from rest_framework import viewsets
class RegisterAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        user = User.objects.filter(username=username).first()

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=400)

        if not user.check_password(password):
            return Response({'error': 'Invalid credentials'}, status=400)

        serializer = UserSerializer(user)

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data
        })

      

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.items.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# class PlayerInventoryViewSet(viewsets.ModelViewSet):
#     queryset = PlayerInventory.objects.all()
#     serializer_class = PlayerInventorySerializer

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

