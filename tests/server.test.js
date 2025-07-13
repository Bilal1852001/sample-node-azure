const request = require('supertest');
const app = require('../server/index');

describe('Server API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('GET /api/hello', () => {
    it('should return hello message', async () => {
      const res = await request(app)
        .get('/api/hello')
        .expect(200);
      
      expect(res.body).toHaveProperty('message', 'Hello from Azure DevOps CI/CD Tutorial!');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /', () => {
    it('should serve the React app', async () => {
      const res = await request(app)
        .get('/')
        .expect(200);
      
      // Since we don't have the built React app yet, this might return 404
      // In a real scenario, this would serve the index.html file
      expect(res.status).toBe(200);
    });
  });

  describe('Error handling', () => {
    it('should handle invalid routes', async () => {
      const res = await request(app)
        .get('/api/nonexistent')
        .expect(404);
    });
  });
});

// Test data validation
describe('API Response Validation', () => {
  it('should return valid JSON responses', async () => {
    const healthRes = await request(app).get('/api/health');
    expect(typeof healthRes.body).toBe('object');
    
    const helloRes = await request(app).get('/api/hello');
    expect(typeof helloRes.body).toBe('object');
  });

  it('should include timestamps in ISO format', async () => {
    const res = await request(app).get('/api/health');
    const timestamp = res.body.timestamp;
    
    expect(timestamp).toBeDefined();
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });
}); 