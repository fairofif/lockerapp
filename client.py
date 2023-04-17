import pymysql
from appflask import app
from config import mysql
from flask import jsonify, flash, request, make_response

@app.route('/')
def greet():
    return ("hello")

@app.route('/test')
def greet2():
    return ("hello too")
    
@app.route('/getCondition/<lockerID>')
def getCondition(lockerID):
    queryfinal = ("select isFilled from locker where lockerID = '"+lockerID+"'")
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(queryfinal)
    read_row = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(read_row)
    
@app.route('/getAllCondition')
def getAllCondition():
    queryfinal = ("select * from locker")
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(queryfinal)
    read_row = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(read_row)

@app.route('/isFilled/<lockerID>')
def isFilled(lockerID):
    queryfinal = ("SELECT isFilled from locker where lockerID = '"+lockerID+"'")
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(queryfinal)
    read_row = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(read_row)
    
@app.route('/getLockerID/<username>')
def getLockerID(username):
    queryfinal = ("SELECT lockerID from user_locker where username = '"+username+"'")
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(queryfinal)
    read_row = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(read_row)
    
@app.route('/changeCondition/<lockerID>/<condition>', methods=["POST"])
def changeCondition(lockerID, condition):
    queryfinal = ("update locker set isFilled = "+condition+" where lockerID = '"+lockerID+"'")
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(queryfinal)
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(200)
    
@app.route('/login/<username>/<password>')
def login(username, password):
    status = False
    queryfinal = ("select * from user where username = '"+username+"' and password = '"+password+"'")
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(queryfinal)
    if cursor.rowcount > 0:
        status = True
    cursor.close()
    conn.close()
    return jsonify({"status":status})