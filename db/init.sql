SELECT "CREATE DATABASE task_manager_db"
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'task_manager_db')\gexec