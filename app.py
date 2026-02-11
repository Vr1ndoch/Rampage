from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__, static_folder='static', template_folder='templates')

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS guests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            surname TEXT NOT NULL,
            name TEXT NOT NULL,
            attendance TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_guest', methods=['POST'])
def save_guest():
    try:
        data = request.get_json()
        
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        
        c.execute('''
            INSERT INTO guests (surname, name, attendance) 
            VALUES (?, ?, ?)
        ''', (data['surname'], data['name'], data['attendance']))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    init_db()

    app.run(debug=True)

