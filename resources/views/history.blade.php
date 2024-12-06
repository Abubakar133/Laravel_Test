<table>
    <tr>
        <th>File Name</th>
        <th>Status</th>
        <th>Uploaded At</th>
        <th>Actions</th>
    </tr>
    @foreach($files as $file)
    <tr>
        <td>{{ $file->file_name }}</td>
        <td>{{ $file->upload_status }}</td>
        <td>{{ $file->uploaded_at }}</td>
        <td>
            @if($file->upload_status === 'Completed')
            <a href="/file/{{ $file->id }}">View Data</a>
            @endif
        </td>
    </tr>
    @endforeach
</table>
