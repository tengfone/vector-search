# vector-search

Using Vector Databases (Weaviate) to search for similar images.

ResNet50 (PyTorch) running on Docker is used to extract the image features and convert it into Vectors. The vectors are then stored in a Weaviate database. The Weaviate database is then used to search for similar images.
