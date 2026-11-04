#!/usr/bin/env python3
"""Regenerate data/pages.json from Canada Exterior Pressure Washing pSEO workbook."""

from __future__ import annotations

import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XLSX = Path("/Users/jairusotiko/Downloads/pSEO - Canada Exterior Pressure Washing.xlsx")
OUT = ROOT / "data" / "pages.json"


def _read_sheet_rows(path: Path) -> list[list]:
    ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    with zipfile.ZipFile(path) as z:
        shared = ET.fromstring(z.read("xl/sharedStrings.xml"))
        strings: list[str] = []
        for si in shared.findall(".//m:si", ns):
            parts = []
            for t in si.findall(".//m:t", ns):
                if t.text:
                    parts.append(t.text)
            strings.append("".join(parts))
        sheet = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
        rows: list[list] = []
        for row in sheet.findall(".//m:sheetData/m:row", ns):
            cells: list = []
            for c in row.findall("m:c", ns):
                t = c.get("t")
                v = c.find("m:v", ns)
                if v is None or v.text is None:
                    cells.append(None)
                elif t == "s":
                    cells.append(strings[int(v.text)])
                else:
                    cells.append(v.text)
            rows.append(cells)
    return rows


def parse() -> tuple[list[dict], set[str]]:
    rows = _read_sheet_rows(XLSX)
    pages: list[dict] = []
    cities: set[str] = set()
    current = "Commercial pressure washing"

    for row in rows[2:]:
        cells = list(row) + [None] * 13
        c0 = cells[0]
        if isinstance(c0, str) and cells[1] is None and cells[2] is None and c0.strip():
            if not re.match(r"^\d", c0.strip()):
                if "CITY / AREA" in c0.upper():
                    current = "Local commercial washing"
                elif "EXPORT" not in c0.upper():
                    current = c0.split("-")[0].strip().title()
                continue

        num, title, slug, pk, sk, area, *_rest = cells[:13]
        if not (slug and isinstance(slug, str) and slug.startswith("/")):
            continue

        slug = slug.lstrip("/")
        area_str = area or "Canada (National)"
        if "National" not in str(area_str):
            cities.add(str(area_str))
            cat = "Local commercial washing"
        else:
            cat = current

        sec = ""
        if sk:
            sec = "; ".join(s.strip() for s in re.split(r"[;,]", str(sk)) if s.strip())

        pages.append(
            {
                "num": num,
                "title": title,
                "slug": slug,
                "primary_kw": pk or "",
                "secondary_kw": sec,
                "area": area_str,
                "vol": float(cells[8]) if cells[8] not in (None, "") else None,
                "kd": float(cells[9]) if cells[9] not in (None, "") else None,
                "cpc": float(cells[10]) if cells[10] not in (None, "") else None,
                "category": cat,
            }
        )

    return pages, cities


def main() -> None:
    pages, cities = parse()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps({"pages": pages, "cities": sorted(cities)}, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(pages)} pages, {len(cities)} cities → {OUT}")


if __name__ == "__main__":
    main()
