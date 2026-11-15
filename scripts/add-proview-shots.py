from pathlib import Path
from PIL import Image

base = Path(r"\\?\C:\Users\akanshu.vishwakarma_\.cursor\projects\c-Users-akanshu-vishwakarma-customer-portal-portfolio-akanshu-portfolio\assets")
out = Path(r"public\work")

copies = {
    "c__Users_akanshu.vishwakarma__AppData_Roaming_Cursor_User_workspaceStorage_afa7f4d447463603ad46d68824a5bbfe_images_741252_741252F3069CAM99486_2026-02-25-14-52-32-14d56af0-8576-40a9-95d2-120dd5cf49c9.jpg": "provigil-cam-day.jpg",
    "c__Users_akanshu.vishwakarma__AppData_Roaming_Cursor_User_workspaceStorage_afa7f4d447463603ad46d68824a5bbfe_images_741252_741252F3069CAM40774_2026-02-20-13-24-23-c0bf680c-b1ec-4cf6-85ea-b041a17c9e0a.jpg": "provigil-cam-night.jpg",
    "c__Users_akanshu.vishwakarma__AppData_Roaming_Cursor_User_workspaceStorage_afa7f4d447463603ad46d68824a5bbfe_images_736368_736368F2798CAM61982_2026-02-18-16-45-45-69f5010c-138f-4de9-bcb2-9170fad5e35b.jpg": "provigil-cam-lot.jpg",
}

for source_name, dest_name in copies.items():
    image = Image.open(base / source_name).convert("RGB")
    image.save(out / dest_name, quality=86, optimize=True)
    print(dest_name, image.size)

crime = Image.open(base / "c__Users_akanshu.vishwakarma__AppData_Roaming_Cursor_User_workspaceStorage_afa7f4d447463603ad46d68824a5bbfe_images_Screenshot_2025-12-17_132852-e01eaa6e-aded-41a9-a670-3dbeec810227.jpg")
print("crime", crime.size)
