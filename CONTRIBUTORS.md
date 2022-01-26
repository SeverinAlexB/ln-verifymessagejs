# Publish new release

1. Run tests `npm run test`.
2. Update version in `package.json`.
3. Add version git tag.

```bash
git tag v0.0.3
git push origin v0.0.3
```

4. Pushlish new npm version with `npm run build && npm publish`.



