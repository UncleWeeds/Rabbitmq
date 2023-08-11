
#!/bin/bash

# Wait for RabbitMQ to be ready
until nc -z -v -w30 rabbitmq 5672; do
  echo "RabbitMQ is unavailable - sleeping"
  sleep 5
done

echo "RabbitMQ is up - running application"
exec node index.js
