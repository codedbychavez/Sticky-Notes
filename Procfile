web: gunicorn backend.wsgi
release: python manage.py makemigrations --noinput
release: python manage.py collectstatic --noinput
release: python manage.py migrate --noinput
release: python manage.py createsuperuserwithpassword \
        --username chavez \
        --password P@ssword123 \
        --email developer.chavezharris@gmail.com \
        --preserve