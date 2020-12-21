#!/usr/bin/env python
# coding: utf-8

# In[2]:
import argparse

import pandas as pd
import numpy as np
import sys

from gensim.models import Word2Vec
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# In[3]:
# Define the parser
parser = argparse.ArgumentParser(description='Short sample app')
args = sys.argv[1]

file_name="prepdata.pkl"
df2 = pd.read_pickle(file_name)

# In[4]:
df2.head(5)

# In[7]:
preprocessed_data = df2

def getres(recherche):

    prep_data = preprocessed_data["preprocessed"].tolist()
    vectorizer = TfidfVectorizer(max_df=.65, min_df=1, stop_words="english", use_idf=True, norm=None)
    tfidf = vectorizer.fit_transform(prep_data)


    cosine_similarities = cosine_similarity(tfidf, vectorizer.transform([recherche])).flatten()
    dftest = preprocessed_data[0:0]
    resultat = []

    for i in range(20):
        index = []
        best_match_index = cosine_similarities.argmax()
        index.append(best_match_index)

        cosine_similarities = np.delete(cosine_similarities, best_match_index)
        resultat.append(preprocessed_data.loc[best_match_index,"text"])



    return resultat


# In[8]:
res = getres(args)
with open(sys.argv[2], 'w') as fd:
	fd.write(str(res))
print(res)