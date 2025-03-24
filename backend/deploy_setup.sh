#!/bin/bash

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install Python dependencies if not already installed
echo "Installing Python and related packages..."
sudo apt-get install -y python3 python3-pip python3-venv

# Create and activate virtual environment
echo "Setting up virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install requirements
echo "Installing application dependencies..."
pip install -r requirements.txt

# Install Gunicorn
echo "Installing Gunicorn..."
pip install gunicorn

# Create systemd service file
echo "Creating systemd service file..."
cat > quiz-search.service << EOF
[Unit]
Description=Quiz Search Backend Service
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/prototype/backend
Environment="PATH=/home/ubuntu/prototype/backend/venv/bin"
ExecStart=/home/ubuntu/prototype/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 "app:create_app()"
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Move service file to appropriate location
sudo mv quiz-search.service /etc/systemd/system/

# Reload systemd, enable and start the service
echo "Starting and enabling the service..."
sudo systemctl daemon-reload
sudo systemctl start quiz-search
sudo systemctl enable quiz-search

echo "Deployment setup complete!"
echo "Check service status with: sudo systemctl status quiz-search"
