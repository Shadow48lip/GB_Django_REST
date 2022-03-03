from django.test import TestCase

class TestMainappSmoke(TestCase):

    def test_index_urls(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)