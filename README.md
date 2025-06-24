# Contentful Landing Page Builder

This project is a fullstack solution for building landing pages powered by Contentful, featuring a drag-and-drop layout editor and a static frontend renderer.

## 🚀 Overview

This repo contains:

1. **Drag-and-Drop Editor (Contentful App)**  
   Built with React, Vite, and Redux, this editor allows users to visually build landing page layouts using blocks like Hero, TwoColumn, and ImageGrid. It autosaves the layout configuration as JSON into a Contentful entry.

2. **Frontend Renderer (Next.js App)**  
   A statically generated site using Next.js App Router and GraphQL that pulls the layoutConfig from Contentful and renders the final landing page.

---

## 🛠️ Tech Stack

### Contentful App (Editor)
- React + Vite
- Redux Toolkit + Redux Persist
- @dnd-kit for drag-and-drop
- Undo/Redo with Redux history
- JSON layoutConfig autosave

### Frontend (Renderer)
- Next.js 15 (App Router) + TypeScript
- GraphQL Contentful API
- CSS Modules for scoped styling
- Static Site Generation (SSG)

---

## 📦 Features

- 🔧 Drag-and-drop layout builder inside Contentful
- 💾 Autosaves block order and settings to layoutConfig field
- 🔁 Undo/Redo state using Redux history
- 🌐 Frontend statically renders blocks based on config + content
- 📱 Responsive layout with reusable components

---

## 📁 Folder Structure

