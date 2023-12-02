from django.urls import path
from . import views


urlpatterns = [
    path("manage_all_users/",views.ManegeAllUsers.as_view(), name="manage_all_users"),
    path("manage_single_user/<int:pk>",views.ManageParticularUser.as_view(), name="manage_single_user"),
    path("manage_all_roles/",views.ManageRoles.as_view(), name="manage_all_users"),
    path("get_single_grant/<int:pk>/",views.ManageParticularGrant.as_view(), name="get_user's_grant"),
    path("manage_all_grants/", views.ManageGrants.as_view(),name="post_new_grant")
    
]