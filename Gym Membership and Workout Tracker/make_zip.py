import os, zipfile, textwrap

# Root directory
root = "gym-app"

# Folder structure
dirs = [
    "backend/config", "backend/models", "backend/controllers", "backend/routes",
    "frontend/public", "frontend/src/components"
]

# Files with minimal sample contents (you can replace these with your scaffolded code)
files = {
    "backend/server.js": "console.log('Gym Backend Server');",
    "backend/config/db.js": "console.log('MongoDB connection');",
    "frontend/public/index.html": "<!DOCTYPE html><html><body><h1>Gym App</h1></body></html>",
    "frontend/src/index.js": "console.log('Gym Frontend');"
}

# Create folders
for d in dirs:
    os.makedirs(os.path.join(root, d), exist_ok=True)

# Create files
for path, content in files.items():
    with open(os.path.join(root, path), "w") as f:
        f.write(textwrap.dedent(content))

# Zip everything
zip_name = f"{root}.zip"
with zipfile.ZipFile(zip_name, "w", zipfile.ZIP_DEFLATED) as zipf:
    for foldername, subfolders, filenames in os.walk(root):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            arcname = os.path.relpath(file_path, root)
            zipf.write(file_path, arcname)

print(f"\n✅ Done! Your project has been zipped as: {zip_name}")
print(f"Path: {os.path.abspath(zip_name)}")
