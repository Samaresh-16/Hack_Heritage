# -*- coding: utf-8 -*-
"""
Created on Sun Sep 17 17:11:35 2023

@author: rayso
"""

def jl(s1, s2, s3, s4):
    jlscore = s1 + s2 + s3 + s4
    return jlscore

def Sc(s1, s2, s3, s4):
    Scscore = s1 + s2 + s3 + s4
    return Scscore

def Ep(s1, s2, s3, s4):
    Epscore = s1 + s2 + s3 + s4
    return Epscore

def Ae(s1, s2, s3, s4):
    Aescore = s1 + s2 + s3 + s4
    return Aescore

def Sw(s1, s2, s3, s4):
    Swscore = s1 + s2 + s3 + s4
    return Swscore

# def interprete_subscale(score):
#     if 4 <= score <= 5:
#         print("Almost never")
#     elif 6 <= score <= 9:
#         print("Sometimes")
#     elif 10 <= score <= 13:
#         print("Often")
#     elif 14 <= score <= 16:
#         print("Almost always")

# def interprete_scale(score):
#     if 16 <= score <= 23:
#         print("Almost never")
#     elif 24 <= score <= 39:
#         print("Sometimes")
#     elif 40 <= score <= 55:
#         print("Often")
#     elif 56 <= score <= 64:
#         print("Almost always")

def interprete_subscale():
    i =list(map(int, input().split())) 

    JLS = jl(i[0], i[4], i[8], i[12])
    SCS = Sc(i[1], i[5], i[9], i[13])
    EPS = Ep(i[2], i[6], i[10], i[14])
    AES = Ae(i[3], i[7], i[11], i[15])
    SWS = Sw(JLS, SCS, EPS, AES)
    res= {"JLS":JLS, "SCS":SCS, "EPS":EPS,"AES": AES}
    weak_zones=[]
    for i in res:
        if res[i] <= 7:
            weak_zones.append(i)

    #Recommend games and activities to improve the weak zones
    # print("Total score: ", SWS)
    # if(len(weak_zones)==0):
    #     print("You are doing great!")
    #     res = sorted(res)
    #     print("You can work on: ", res[0])
    # else:
    #     print("Your weak zones are: ", weak_zones)

    scaling_factor=100-(64-SWS)
    print(SWS)
    # print(scaling_factor) 
    return scaling_factor

score=interprete_subscale()
print(score)
