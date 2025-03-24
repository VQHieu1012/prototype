#!/bin/bash

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install PostgreSQL
echo "Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Check PostgreSQL service status
echo "Checking PostgreSQL service status..."
sudo systemctl status postgresql

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql << EOF
CREATE DATABASE quiz_search;
CREATE USER quizuser WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE quiz_search TO quizuser;
\c quiz_search
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- For better text search capabilities
\q
EOF

# Configure PostgreSQL for remote connections (if needed)
# Uncomment these lines if you need remote access
echo "Configuring PostgreSQL for connections..."
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/12/main/postgresql.conf
sudo bash -c 'cat > /etc/postgresql/12/main/pg_hba.conf.append << EOF
# Allow connections from any IP with password
host    all             all             0.0.0.0/0               md5
EOF'
sudo bash -c 'cat /etc/postgresql/12/main/pg_hba.conf.append >> /etc/postgresql/12/main/pg_hba.conf'

# Restart PostgreSQL to apply changes
echo "Restarting PostgreSQL service..."
sudo systemctl restart postgresql

# Display connection information
echo -e "\n\n===== PostgreSQL Setup Complete ====="
echo "Database: quiz_search"
echo "Username: quizuser"
echo "Password: your_strong_password (change this to your actual password)"
echo "Connection string: postgresql://quizuser:your_strong_password@localhost:5432/quiz_search"
echo "==========================================="
echo "You should update this connection string in your application's .env file"
