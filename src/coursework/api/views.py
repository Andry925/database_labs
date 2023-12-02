from django.http import Http404
from user_logic.models import User, Grant, Role
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from . serializers import UserSerializers, RoleSerializers, GrantSerializers


class ManegeAllUsers(APIView):

    def get(self, request):
        all_users = User.objects.all()
        get_serializer = UserSerializers(all_users, many=True)
        return Response(get_serializer.data)

    def post(self, request):
        post_serializer = UserSerializers(data=request.data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(
                post_serializer.data,
                status=status.HTTP_201_CREATED)
        return Response(
            post_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)


class ManageParticularUser(APIView):
    def get_object(self, pk):
        try:
            single_user = User.objects.get(pk=pk)
            return single_user
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        got_user = self.get_object(pk=pk)
        get_serializer = UserSerializers(got_user)
        return Response(get_serializer.data)

    def put(self, request, pk):
        put_user = self.get_object(pk=pk)
        put_serializer = UserSerializers(put_user, data=request.data)
        if put_serializer.is_valid():
            put_serializer.save()
            return Response(put_serializer.data)
        return Response(
            put_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        delete_user = self.get_object(pk=pk)
        delete_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ManageRoles(APIView):
    def get(self, request):
        all_roles = Role.objects.all()
        get_serializer = RoleSerializers(all_roles, many=True)
        return Response(get_serializer.data)

    def post(self, request):
        post_serializer = RoleSerializers(data=request.data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(
                post_serializer.data,
                status=status.HTTP_201_CREATED)
        return Response(
            post_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)


class ManageGrants(
        mixins.ListModelMixin,
        mixins.CreateModelMixin,
        generics.GenericAPIView):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializers

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class ManageParticularGrant(
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        generics.GenericAPIView):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializers

    def get(self, request, pk):
        return self.retrieve(request, pk)

    def put(self, request, pk):
        return self.update(request, pk)

    def delete(self, request, pk):
        return self.destroy(request, pk)
