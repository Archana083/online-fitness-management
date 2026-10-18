from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Client, Trainer
from .Serializers import ClientSerializer, TrainerSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST'])
def client_list(request):

    if request.method == 'GET':

        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PATCH', 'PUT', 'DELETE'])
def client_detail(request, pk):
    client = get_object_or_404(Client, pk=pk)
    if request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = ClientSerializer(client, data=request.data, partial=request.method == 'PATCH')
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def trainer_list(request):
    if request.method == 'GET':
        trainers = Trainer.objects.all()
        serializer = TrainerSerializer(trainers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':  
        serializer = TrainerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PATCH', 'PUT', 'DELETE'])
def trainer_detail(request, pk):
          
        trainer = get_object_or_404(Trainer, pk=pk)
        if request.method == 'DELETE':
            trainer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    
        serializer = TrainerSerializer(trainer, data=request.data, partial = request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
