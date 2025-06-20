import subprocess
import os

# Run all processing scripts in order

def run_script(script_name):
    script_path = os.path.join(os.path.dirname(__file__), script_name)
    subprocess.run(["python", script_path], check=True)

if __name__ == "__main__":
    run_script(os.path.join("scripts", "extract_colleges.py"))
    run_script(os.path.join("scripts", "categorize_colleges.py"))
    run_script(os.path.join("scripts", "assign_icons.py"))