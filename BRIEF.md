# Regular Division — shared brief for every room

**Premise.** M.C. Escher (1898–1972) spent his life doing by hand, with compass,
pencil and gouge, mathematics he could barely articulate. Imagine he had a
collaborator who could compute, today. Each "room" of this studio is one thing he
demonstrably reached for and couldn't do by hand, now made live, interactive and
infinite. The site is a gallery of instruments, not a tribute page.

**Hard rules**

1. **No recreations of Escher's actual works.** His prints are under copyright
   until 2043 (and the M.C. Escher Company enforces it). No angels/devils, no
   lizards-from-Reptiles, no Print Gallery town, no monks on stairs, no copying a
   specific print's composition. Use his *techniques and mathematics* with
   **original motifs** (invent your own creatures and scenes). Name his works only
   in prose context, never as a label on your output.
2. **Facts.** Only state facts listed in your room brief or that you are certain
   of. No invented quotes. No quotes attributed to Escher at all.
3. **One self-contained HTML file per room** at `rooms/<slug>.html`. It is served as a
   standalone page (not wrapped), so it must start with `<!doctype html>`, have
   `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">`,
   a `<title>` (2–4 word name), and link the shared chrome with
   `<link rel="stylesheet" href="../studio.css">`. Override `--print` on `:root`
   with your room's woodcut colour. All JS/CSS of your own is inline.
4. **External scripts** only from `https://cdnjs.cloudflare.com/ajax/libs/...`
   pinned to an exact version (e.g. three.js r128:
   `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`). No ES-module
   imports from other hosts. No fetch() to the network. No images from URLs
   (generate everything in code; data: URIs ok).
5. **Shell markup** (use the classes in `studio.css`, read it first):
   ```html
   <div class="room">
     <canvas class="plate" id="plate"></canvas>
     <aside class="rail" id="rail">
       <div class="rail-head"><a class="back" href="../index.html">← Studio</a>
         <button class="toggle" id="railToggle" aria-expanded="true">hide</button></div>
       <h1 class="room-title">Two-to-four <em>words</em></h1>
       <p class="lede">2–4 sentences: what he wanted, why it was out of reach by hand, what you can do here.</p>
       <div class="group"><span class="label">…</span> controls… </div>
       …
     </aside>
   </div>
   ```
   The toggle collapses the rail (`.collapsed`). On phones the rail is a bottom sheet.
   The art must be composed so it still reads with the rail open (shift the visual
   centre right of the rail on desktop, up on phones).
6. **Opens alive.** First frame is already beautiful and moving (gentle ambient
   animation), with a good default motif. Respect `prefers-reduced-motion`
   (stop ambient motion). Handle devicePixelRatio (cap at 2) and resize.
   Pointer events (mouse + touch). Keyboard focus visible.
7. **Quality bar: gallery-worthy.** This is an art piece. Ink-and-paper woodcut /
   lithograph sensibility: limited palette (ink, paper, one or two print colours),
   crisp antialiased edges, considered line weights. Not neon, not generic
   "shader demo". Interiors of tiles should have drawn detail (eyes, scales,
   fins, hatching) so they read as creatures/things, not just polygons.
8. **Verify by looking.** Screenshot with
   `node tools/shot.mjs rooms/<slug>.html shots/<slug>-desk.png 1440 900 3000`
   and `... shots/<slug>-phone.png 400 860 3000` (run from the project root
   `~/builds/regular-division`; WebGL works via SwiftShader; output lists console
   errors). Use `--eval "js"` to exercise an interaction before the shot. Read the
   PNGs. Iterate on what you see at least twice as an art director would: is it
   beautiful? does it read? is anything broken, clipped, ugly? Zero console errors.
9. Don't touch other rooms, `studio.css`, or `index.html`. If you need a chrome
   tweak, do it in your room's own `<style>`.
10. When done, reply with: what you built (3–6 lines), the interactions, the
    known weak spots, and the screenshot paths. No claims you didn't verify by
    screenshot.
